<script setup>
import { onMounted, ref } from 'vue'
import rightApi from '../../api/right'

const rightList = ref([])
const type = ref('list')

const getRightList = () => {
	rightApi.rightList(type.value).then(res => {
		rightList.value = res.data.data
		console.log(res)
	})
}

onMounted(() => {
	getRightList()
})




</script>
<template>
	<div class="rightList">
		<el-table :data="rightList" border style="width: 100%" class="table" stripe>
			<el-table-column label="#" width="50">
				<template #default="{ $index }">
					{{ $index + 1 }}
				</template>
			</el-table-column>
			<el-table-column prop="authName" label="权限名称" />
			<el-table-column prop="path" label="路径" />
			<el-table-column prop="level" label="权限等级">
				<template #default="{ row }">
					<el-button :type="row.level == 0 ? 'primary' : row.level == 1 ? 'success' : 'danger'"
										 plain size="small">
						{{ row.level == 0 ? '一级' : row.level == 1 ? '二级' : '三级' }}
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<style lang="scss" scoped>
.rightList {
	background: #fff;
	border-radius: 5px;
	padding: 20px;
}
</style>
