<template>
	<main id="page-content">
		<app-canvas></app-canvas>
	</main>
</template>

<script>
import AppCanvas from "./components/Canvas.vue";

export default{
	name: "App",
	components: {
		"app-canvas": AppCanvas
	}
};
</script>

<style lang="less" scoped>

</style>