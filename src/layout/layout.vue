<script setup>
import { ref } from 'vue'
import { asyncRoutes } from '../router/index.js'
import { useRouter } from 'vue-router';
const router = useRouter();


</script>
<template>
	<div class="layout">
		<div class="top">

		</div>
		<div class="section">
			<div class="aside">
				<el-menu active-text-color="#ffd04b" background-color="#545c64"
								 class="el-menu-vertical-demo" :default-active="router.path"
								 text-color="#fff" router>
					<el-sub-menu :index="route.path" v-for="(route, i) in asyncRoutes "
											 :key="route.path">
						<template #title>
							<span>{{ route.meta.title }}</span>
						</template>
						<el-menu-item :index="item.path" v-for="(item, idx) in route.children"
													:key="item.path">
							{{ item.meta.title }}
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
		display: flex;

		.aside {
			width: 200px;
			border: 1px solid #ccc;
			height: 300px;
		}


	}
}
</style>
