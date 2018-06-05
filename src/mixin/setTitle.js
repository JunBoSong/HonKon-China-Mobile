export default {
  methods: {
    setTitle() {
      let title = "帶機上台";
      switch (this.$route.query.businessType) {
        case "1":
          title = "帶機上台";
          break;
        case "2":
          title = "集團客戶上台";
          break;
        case "3":
          title = "買機上台";
          break;
        case "4":
          title = "旗艦機上台";
          break;
        default:
          break;
      }
      const req = { type: 5, title: title };
      this.$jb.js2webview(req);
    },
  }
}