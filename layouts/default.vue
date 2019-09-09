<template>
  <div>
    <nav class="sidebar">
      <i class="far fa-plus-square" title="add"></i>
      <i class="far fa-folder-open"></i>
      <i class="fas fa-search"></i>
      <i class="fas fa-draw-polygon"></i>
      <i class="fas fa-bezier-curve"></i>
    </nav>
    <div class="sidebar_content">
      <div class="sidebar_sec people_now">
        <div class="title">
          <i class="fas fa-chevron-down"></i>online
        </div>
        <div class="sidebar_sec_content">
          <ul>
            <li>aaa</li>
            <li>aaa</li>
            <li>aaa</li>
            <li>aaa</li>
            <li>aaa</li>
          </ul>
        </div>
      </div>
      <div class="sidebar_sec channel">
        <div class="title">
          <i class="fas fa-chevron-down"></i>channel
        </div>
        <div class="sidebar_sec_content">
          <ul>
            <li>aaa</li>
            <li>aaa</li>
            <li>aaa</li>
            <li>aaa</li>
            <li>aaa</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="main" id="main">
      <nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          {
            icon: "mdi-apps",
            title: "Welcome",
            to: "/"
          },
          {
            icon: "mdi-chart-bubble",
            title: "Inspire",
            to: "/inspire"
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: "Vuetify.js"
      };
    }
  };
</script>

<style lang="scss">
  @import "assets/variables.scss";

  body {
    background-color: $grayBg;
    color: #bbbbbb;
    font-size: 14px;
    margin: 0;
    font-family: Microsoft JhengHei;
  }
  .sidebar {
    position: fixed;
    width: 40px;
    height: 100%;
    z-index: 10;
    background-color: $grayUi;
    i {
      font-size: 20px;
      display: block;
      text-align: center;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      color: $textGray;
      &:hover {
        color: $textLightGray;
      }
    }
  }
  .sidebar_content {
    position: fixed;
    left: 40px;
    top: 0;
    background-color: $grayBgLight;
    height: 100%;
    width: 160px;
    z-index: 9;
    .title {
      background-color: $grayUi;
      padding: 2px 5px;
    }
    i {
      margin-right: 5px;
    }
  }
  .main {
    padding-left: 200px;
    height: calc(100vh - 70px);
    overflow-y: auto;
  }
</style>