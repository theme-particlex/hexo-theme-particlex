mixins.crypto = {
    data() {
        return {
            crypto: "",
            check: false,
        };
    },
    methods: {
        SHA(word) {
            return CryptoJS.SHA256(word).toString();
        },
        decrypt(word, secret, shasum) {
            try {
                let res = CryptoJS.AES.decrypt(word, secret).toString(CryptoJS.enc.Utf8);
                return { check: this.SHA(res) === shasum, decrypted: res };
            } catch {
                return { check: false };
            }
        },
    },
    watch: {
        crypto(value) {
            let input = this.$refs.crypto,
                content = this.$refs.content;
            let { decrypted, check } = this.decrypt(
                input.dataset.encrypted,
                value,
                input.dataset.shasum
            );
            this.check = check;
            if (check) {
                input.classList.remove("fail");
                input.classList.add("success");
                input.disabled = true;
                content.innerHTML = decrypted;
                this.render();
            } else input.classList.add("fail");
        },
    },
};
mixins.push(cryptoMixin);
