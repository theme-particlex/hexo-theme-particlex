(function () {
    const MAX_VISIBLE_LINES = 5;

    const codeMean = () => {
        const codeBlocks = document.querySelectorAll("code[class*='language-']");

        codeBlocks.forEach((code) => {
            const pre = code.parentNode;
            // 避免重复插入
            if (!pre || pre.querySelector(".copycode")) return;

            const wrapper = document.createElement("div");
            wrapper.className = "code-wrapper";
            pre.parentNode.insertBefore(wrapper, pre);

            const content = document.createElement("div");
            content.className = "code-content";
            wrapper.appendChild(content);
            content.appendChild(pre);

            // 创建悬浮容器
            const copyDiv = document.createElement("div");
            copyDiv.className = "copycode";

            // 检查是否有有效的语言标记，并且语言不是 "none"
            const lang = code.className.match(/language-([\w-]+)/);
            if (lang) {
                const langSpan = document.createElement("span");
                langSpan.className = "code-lang";
                langSpan.textContent = lang[1].toUpperCase() == "NONE" ? "𝑪𝒊𝒂𝒍𝒍𝒐～(∠・ω< )⌒★" : lang[1].toUpperCase();
                wrapper.appendChild(langSpan);
            }

            // 创建 copy 图标
            const iconCopy = document.createElement("i");
            iconCopy.className = "fa-solid fa-copy fa-fw";

            // 创建 check 图标
            const iconCheck = document.createElement("i");
            iconCheck.className = "fa-solid fa-check fa-fw";

            // 添加图标到容器
            copyDiv.appendChild(iconCopy);
            copyDiv.appendChild(iconCheck);

            wrapper.appendChild(copyDiv);

            // 复制事件
            copyDiv.addEventListener("click", () => {
                const codeText = code.innerText.trim();
                navigator.clipboard.writeText(codeText).then(() => {
                    copyDiv.classList.add("copied");

                    setTimeout(() => {
                        copyDiv.classList.remove("copied");
                    }, 1500);
                }).catch(() => {
                    alert("复制失败，请手动复制");
                });
            });

            const rawContent = code.textContent.trimEnd();
            const codeLines = rawContent ? rawContent.split(/\r?\n/) : [];
            if (codeLines.length > MAX_VISIBLE_LINES) {
                wrapper.classList.add("code-collapsible");
                wrapper.setAttribute("tabindex", "-1");

                const fadeDiv = document.createElement("div");
                fadeDiv.className = "code-fade";
                content.appendChild(fadeDiv);

                const toggleBtn = document.createElement("button");
                toggleBtn.type = "button";
                toggleBtn.className = "code-toggle";
                toggleBtn.setAttribute("aria-expanded", "false");
                toggleBtn.textContent = "展开剩余代码";
                wrapper.appendChild(toggleBtn);

                const preStyle = window.getComputedStyle(pre);
                let lineHeight = parseFloat(preStyle.lineHeight);
                if (Number.isNaN(lineHeight)) {
                    const fontSize = parseFloat(preStyle.fontSize) || 16;
                    lineHeight = fontSize * 1.5;
                }
                const paddingTop = parseFloat(preStyle.paddingTop) || 0;
                const paddingBottom = parseFloat(preStyle.paddingBottom) || 0;
                const collapsedHeight =
                    lineHeight * MAX_VISIBLE_LINES + paddingTop + paddingBottom;
                const collapsedHeightPx = `${collapsedHeight}px`;
                content.style.maxHeight = collapsedHeightPx;
                content.style.overflow = "hidden";
                content.style.transition = "max-height 0.35s ease";

                const setExpanded = (expanded) => {
                    const wasExpanded = wrapper.classList.contains("expanded");
                    const wrapperRectBefore = wrapper.getBoundingClientRect();
                    if (expanded) {
                        wrapper.classList.add("expanded");
                        content.style.maxHeight = `${content.scrollHeight}px`;
                        toggleBtn.setAttribute("aria-expanded", "true");
                        toggleBtn.textContent = "收起代码";
                        fadeDiv.style.opacity = "0";
                        wrapper.focus({ preventScroll: true });
                    } else {
                        wrapper.classList.remove("expanded");
                        content.style.maxHeight = collapsedHeightPx;
                        toggleBtn.setAttribute("aria-expanded", "false");
                        toggleBtn.textContent = "展开剩余代码";
                        fadeDiv.style.opacity = "";

                        // console.log(`wasExpanded:${wasExpanded},
                        //     wrapperRectBefore.bottom:${wrapperRectBefore.bottom},
                        //     wrapperRectBefore.top:${wrapperRectBefore.top},
                        //      window.innerHeight:${window.innerHeight}
                        //     `)
                        // —— 通用视口稳定 —— //
                        const viewportH = window.visualViewport ? window.visualViewport.height : window.innerHeight;
                        const viewportTop = 0;
                        const viewportBottom = viewportH;

                        const scroller = getScrollParent(wrapper);
                        const before = wrapperRectBefore; // 你前面已经量过

                        // 判定与视口的关系
                        const intersects = (before.bottom > viewportTop) && (before.top < viewportBottom);
                        let mode = 'below';
                        if (intersects) {
                            // 两条边哪条在视口内？优先固定“可见的边”
                            const bottomVisible = before.bottom <= viewportBottom;
                            const topVisible = before.top >= viewportTop;
                            mode = bottomVisible ? 'pin-bottom' : (topVisible ? 'pin-top' : 'pin-top');
                        } else {
                            mode = (before.bottom <= viewportTop) ? 'above' : 'below';
                        }

                        // 禁用浏览器滚动锚定，避免双重补偿
                        content.style.setProperty('overflow-anchor', 'none');

                        const adjustViewport = () => {
                            const after = wrapper.getBoundingClientRect();
                            let dy = 0;
                            switch (mode) {
                                case 'pin-bottom':
                                    // console.log('pin-bottom')
                                    // dy = before.bottom - after.bottom;
                                    break;
                                case 'pin-top':
                                    // console.log('pin-top')
                                    dy = before.top - after.top;
                                    break;
                                case 'above':
                                    // console.log('above')
                                    // dy = (before.height - after.height);
                                    break;
                                case 'below':
                                    // console.log('below')
                                    dy = 0;
                                    break;
                            }
                            if (Math.abs(dy) > 1) {
                                const rootScroller = (scroller === document.scrollingElement ||
                                    scroller === document.documentElement ||
                                    scroller === document.body);
                                if (rootScroller) {
                                    window.scrollBy(0, dy);
                                } else {
                                    scroller.scrollTop += dy;
                                }
                            }
                            // 还原浏览器滚动锚定
                            content.style.removeProperty('overflow-anchor');
                        };

                        // 过渡结束后再补偿（带兜底）
                        onTransitionEndOnce(content, 'max-height', adjustViewport);

                    }
                };

                toggleBtn.addEventListener("click", (event) => {
                    event.stopPropagation();
                    const wantExpand = !wrapper.classList.contains("expanded");
                    setExpanded(wantExpand);
                });

                wrapper.addEventListener("focusout", (event) => {
                    if (
                        !wrapper.contains(event.relatedTarget) &&
                        wrapper.classList.contains("expanded")
                    ) {
                        setExpanded(false);
                    }
                });

                wrapper.addEventListener("keydown", (event) => {
                    if (event.key === "Escape" && wrapper.classList.contains("expanded")) {
                        setExpanded(false);
                    }
                });

                setExpanded(false);
            }
        });
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", codeMean);
    } else {
        codeMean();
    }

    // 放到文件顶部或外侧复用
    function getScrollParent(el) {
        const regex = /(auto|scroll|overlay)/;
        let p = el.parentElement;
        while (p && p !== document.body) {
            const st = getComputedStyle(p);
            if (regex.test(st.overflowY || st.overflow)) return p;
            p = p.parentElement;
        }
        // 回退到文档滚动体
        return document.scrollingElement || document.documentElement;
    }

    function onTransitionEndOnce(el, propName, cb, fallbackMs = 450) {
        let done = false;
        const handler = (e) => {
            if (e.target !== el) return;
            if (propName && e.propertyName !== propName) return;
            el.removeEventListener('transitionend', handler);
            if (!done) { done = true; cb(); }
        };
        el.addEventListener('transitionend', handler, { once: true });
        setTimeout(() => {
            el.removeEventListener('transitionend', handler);
            if (!done) { done = true; cb(); }
        }, fallbackMs);
    }


})();
