<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import goodsApi from "../../api/goods";
import moment from "moment";
import catApi from "../../api/cat";

const goodsList = ref([]);
const total = ref(0);
const editFlag = ref(false);
const tree = ref();
const select = ref();
const page = reactive({
  query: "",
  pagenum: 1,
  pagesize: 10
});
const dialogVisible = ref(false);
const catList = ref([]);
const goodsInfo = ref({
  goods_name: "",
  goods_price: "",
  goods_weight: "",
  goods_number: "",
  goods_cat: "",
  goods_introduce: "",
  pics: [],
  attrs: []
});

watch(
  [page],
  () => {
    getGoodsList();
  },
  { deep: true }
);

const getGoodsList = () => {
  goodsApi.goodsList(page).then((res) => {
    // console.log(res);
    goodsList.value = res.data.data.goods;
    // console.log(goodsList.value);
    total.value = res.data.data.total;
  });
  catApi.catList({ type: 3 }).then((res) => {
    console.log(res, "分类列表");
    catList.value = res.data.data;
  });
};
onMounted(() => {
  getGoodsList();
});

const getCatList = () => {
  dialogVisible.value = true;
  editFlag.value = false;
};

const addGoods = () => {
  dialogVisible.value = false;
  let arr = [
    ...tree.value.getHalfCheckedKeys(),
    ...tree.value.getCheckedKeys()
  ].toString();
  goodsInfo.value.goods_cat = arr;
  console.log(arr, "分类");
  console.log(goodsInfo.value, "信息");
  // goodsApi.addGoods(goodsInfo.value).then((res) => {
  //   getGoodsList();
  //   console.log(res, "添加商品");
  // });
};
</script>
<template>
  <div class="goods">
    <div class="ipt">
      <el-input v-model="page.query" placeholder="请输入内容">
        <template #append>
          <el-button icon="Search" />
        </template>
      </el-input>
      <el-button type="primary" @click="getCatList()">添加商品</el-button>
    </div>
    <el-table :data="goodsList" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="110"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="90"></el-table-column>
      <el-table-column prop="goods_number" label="商品数量" width="90"></el-table-column>
      <el-table-column label="创建时间" width="170">
        <template #default="{ row }">
          {{ moment(row.add_time).format("YYYY-MM-DD HH-mm-ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="110">
        <template #default="{ row }">
          <el-button size="small" icon="EditPen" type="primary"></el-button>
          <el-button size="small" icon="Delete" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total,sizes,prev, pager, next,jumper"
      v-model:total="total"
      v-model:page-size="page.pagesize"
      :page-sizes="[10, 20, 30]"
      v-model:current-page="page.pagenum"
      class="mt-4" />
  </div>
  <el-dialog v-model="dialogVisible" title="添加商品">
    <el-form :model="goodsInfo">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="goodsInfo.goods_name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类列表">
        <el-tree-select
          v-model="select"
          :data="catList"
          :props="{ label: 'cat_name', disabled: 'cat_level' == 2 ? false : true }"
          show-checkbox
          ref="tree"
          node-key="cat_id"
          style="width: 240px" />
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input v-model="goodsInfo.goods_price" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_number">
        <el-input v-model="goodsInfo.goods_number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品重量" prop="goods_weight">
        <el-input v-model="goodsInfo.goods_weight" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品介绍" prop="goods_introduce">
        <el-input v-model="goodsInfo.goods_introduce" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addGoods()"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.goods {
  padding: 20px;
  background: #fff;
  .ipt {
    .el-input {
      width: 300px;
      margin-right: 20px;
    }
    display: flex;
    margin-bottom: 20px;
  }
  .el-table {
    margin-bottom: 20px;
  }
}
</style>
