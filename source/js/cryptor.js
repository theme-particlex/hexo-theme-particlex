const cryptor = {
    init(enc, sha) {
        this.enc = enc;
        this.sha = sha;
        this.composition = false;
        window.addEventListener("load", () => {
            this.input = document.getElementsByClassName("crypto")[0];
            this.content = document.getElementsByClassName("content")[0];
            this.content.style.opacity = 0;
            this.input.addEventListener("input", () => this.composition || this.update());
            this.input.addEventListener("compositionstart", () => (this.composition = true));
            this.input.addEventListener("compositionend", () => {
                this.update(), (this.composition = false);
            });
        });
    },
    SHA(str) {
        return CryptoJS.SHA256(str).toString(CryptoJS.enc.Base64);
    },
    decrypt(enc, key, sha) {
        try {
            let res = CryptoJS.AES.decrypt(enc, this.SHA(key), {
               mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }).toString(CryptoJS.enc.Utf8);
            return { dec: res, check: this.SHA(res) == sha };
        } catch {
            return { check: false };
        }
    },
    update() {
        let res = this.decrypt(this.enc, this.SHA(this.input.value), this.sha);
        if (res.check) {
            this.input.disabled = true;
            this.input.classList.remove("fail");
            this.input.classList.add("success");
            this.content.innerHTML = res.dec;
            this.content.style.opacity = 1;
            highlight();
            showimg();
            rendermath();
        } else this.input.classList.add("fail");
    },
};
