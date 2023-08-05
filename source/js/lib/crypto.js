mixins.crypto = {
    data() {
        return { crypto: "", cryptoStatus: "" };
    },
    watch: {
        crypto(value) {
            let input = this.$refs.crypto,
                content = this.$refs.content;
            let { encrypted, shasum } = input.dataset;
            try {
                let decrypted = CryptoJS.AES.decrypt(encrypted, value).toString(CryptoJS.enc.Utf8);
                if (CryptoJS.SHA256(decrypted).toString() === shasum) {
                    this.cryptoStatus = "success";
                    content.innerHTML = decrypted;
                    this.render();
                } else this.cryptoStatus = "failure";
            } catch {
                this.cryptoStatus = "failure";
            }
        },
    },
};
