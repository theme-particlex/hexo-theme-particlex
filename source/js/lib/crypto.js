mixins.crypto = {
    data() {
        return {
            crypto: "",
            check: null,
        };
    },
    watch: {
        crypto(value) {
            let input = this.$refs.crypto,
                content = this.$refs.content;
            let { encrypted, shasum } = input.dataset;
            try {
                let decrypted = CryptoJS.AES.decrypt(encrypted, value).toString(CryptoJS.enc.Utf8);
                if (CryptoJS.SHA256(decrypted).toString() === shasum) {
                    this.check = true;
                    content.innerHTML = decrypted;
                    this.render();
                } else this.check = false;
            } catch {
                this.check = false;
            }
        },
    },
    computed: {
        cryptoClass() {
            if (this.check === null) return "";
            if (this.check === true) return "success";
            if (this.check === false) return "fail";
        },
    },
};
