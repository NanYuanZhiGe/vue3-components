<script setup lang="ts">
import TwoResizeComponent from "@/components/TwoResizeComponent.vue";
import TwoOverlayComponent from "@/components/TwoOverlayComponent.vue";
</script>

<template>
  <div style="height: 100vh">
    <TwoResizeComponent :layout="'horizontal'" :initFirstRatio="15" :allowMaxRatio="90">
      <template #son>
        <div style="background: #f0f0f0; height: 100%; padding: 10px;">
          左侧面板
          <p>code file 1</p>
          <p>code file 1001</p>
          <p>code file 10086</p>
          <p>code file 1008611</p>
          <p>code file 11234567890000</p>
        </div>
      </template>
      <template #daughter>
        <TwoOverlayComponent :layout="'vertical'" :fixedBaby="'son'" :fixedSize="100" :initChangeSize="10"
          :allowMinChangeSize="10" :allowMaxChangeSize="95">
          <template #son>
            <div style="background: #444444;height: 100%;">
              <h1 style="margin: 0;">This is a code area</h1>
              <p>import &lt;iostream&gt;</p>
              <p>using namespace std</p>
              <br></br>
              <p>int main(){</p>
              <p>cout&lt;&lt;"hello world"&lt;&lt;endl;</p>
              <p>return 0;</p>
              <p>}</p>
            </div>
          </template>
          <template #daughter>
            <div style="background: #000000;height: 100%;">
              <h3 style="margin-top: 0;">this is a terminal area</h3>
            </div>
          </template>
        </TwoOverlayComponent>
      </template>
    </TwoResizeComponent>
  </div>
</template>

<style scoped></style>
