<script setup>
import { ref } from 'vue'
import { asyncRoutes } from '../router/index.js'
import { useRoute } from 'vue-router';
const route = useRoute();


</script>
<template>
	<div class="layout">
		<div class="top">
		</div>
		<div class="section">
			<div class="aside">
				<el-menu style="width: 100%" active-text-color="#ffd04b"
								 background-color="#545c64" class="el-menu-vertical-demo"
								 :default-active="route.path" text-color="#fff" router>
					<el-sub-menu :index="router.path" v-for="router in asyncRoutes "
											 :key="router.path">
						<template #title>
							<el-icon>
								<component :is="router.icon" />
							</el-icon>
							<span>{{ router.meta.title }}</span>
						</template>
						<el-menu-item :index="item.path" v-for="item in router.children"
													:key="item.path">
							<el-icon>
								<component :is="item.icon" />
							</el-icon>
							<span>{{ item.meta.title }}</span>
						</el-menu-item>
					</el-sub-menu>
				</el-menu>
			</div>
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.layout {

	.top {
		height: 40px;
		background-color: #000;
	}

	.section {
		min-height: 530px;
		display: flex;

		.aside {
			width: 15%;
			overflow: hidden;

			.el-menu-vertical-demo {
				background: #545c64;
				height: 100%;
			}
		}

		.main {
			width: 85%;
			background: #eaedf1;
			padding: 20px;
			font-size: 14px;
			overflow: auto;
			// padding-bottom: 40px;
			box-sizing: border-box;
		}
	}
}
</style>
