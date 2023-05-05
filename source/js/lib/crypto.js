mixins.crypto = {
    data() {
        return { crypto: "", cryptoStatus: null };
    },
    watch: {
        crypto(value) {
            let input = this.$refs.crypto,
                content = this.$refs.content;
            let { encrypted, shasum } = input.dataset;
            try {
                let decrypted = CryptoJS.AES.decrypt(encrypted, value).toString(CryptoJS.enc.Utf8);
                if (CryptoJS.SHA256(decrypted).toString() === shasum) {
                    this.cryptoStatus = true;
                    content.innerHTML = decrypted;
                    this.render();
                } else this.cryptoStatus = false;
            } catch {
                this.cryptoStatus = false;
            }
        },
    },
    computed: {
        cryptoClass() {
            if (this.cryptoStatus === null) return "";
            if (this.cryptoStatus === true) return "success";
            if (this.cryptoStatus === false) return "fail";
        },
    },
};
