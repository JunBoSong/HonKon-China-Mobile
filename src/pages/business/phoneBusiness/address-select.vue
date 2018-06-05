<template>
  <div>
    <vp-layout-page>
      <vpInputAddress v-model="address" />
      <div class="page-btns" slot="footer">
        <vp-button content="確認" @click.native="sure"></vp-button>
      </div>
    </vp-layout-page>
  </div>
</template>

<script type="text/javascript">
import { vpInputAddress } from "@/components";
export default {
  data() {
    return {
      address: {}
    };
  },
  methods: {
    sure() {
      this.$session.set("contactAddress", this.address);
      this.$router.back();
    }
  },
  components: { vpInputAddress },
  beforeRouteLeave(to, from, next) {
    let path = to.path;
    if (path == "/business/handleBase/baseInfo") {
      this.$session.set("address-contact", this.address);
      //   this.$event.$emit("ADDRESS-SELECTED", this.address);
    }
    if (path == "/business/handleBase/handleInfo") {
      this.$session.set("address-deliver", this.address);
      //   this.$event.$emit("ADDRESS-SELECTED", this.address);
    }
    next(true);
  }
};
</script>

<style lang="less" scoped>

</style>
