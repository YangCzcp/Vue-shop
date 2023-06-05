<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品发布</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="分类">
          <el-select v-model="form.cate_1st" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in cate_1st_options" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <el-select v-model="form.cate_2nd" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in cate_2nd_options" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <el-select v-model="form.cate_3rd" placeholder="请选择活动区域">
            <el-option v-for="(item, index) in cate_3rd_options" :label="item.name" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model.number="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价">
          <el-input v-model.number="form.marketPrice"></el-input>
        </el-form-item>
        <el-form-item label="成本价">
          <el-input v-model="form.cost"></el-input>
        </el-form-item>
        <el-form-item label="折扣">
          <el-input v-model="discount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model.number="form.inventory"></el-input>
        </el-form-item>
        <el-form-item label="货号">
          <el-input v-model="form.articleNo"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <MianPotoUploadVue action="/upload/goods" :url.sync="form.img_md" :lg-img.sync="form.img_lg"></MianPotoUploadVue>
        </el-form-item>
        <el-form-item label="轮播图">
          <SliderUploadVue action="/upload/slider" v-model="form.slider"></SliderUploadVue>
        </el-form-item>
        <el-form-item label="运费">
          <el-input v-model="form.freight"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Category } from '@/api/index'
import MianPotoUploadVue from '@/components/MianPotoUpload.vue'
import SliderUploadVue from '@/components/SliderUpload.vue'
export default {
  name: 'Release',
  data() {
    return {
      form: {
        cate_1st: '', // 保存一级分类选中的值
        cate_2nd: '',
        cate_3rd: '',
        name: '',
        price: 0,
        marketPrice: 0,
        cost: 0,
        discount: 0,
        inventory: 0,
        articleNo: '',
        img_lg: '',
        img_md: '',
        slider: '',
        detail: '',
        freight: ''
      },
      cate_1st_options: [], // 保存一级分类数据
      cate_2nd_options: [], // 二级分类数据
      cate_3rd_options: [] // 三级分类数据
    }
  },
  watch: {
    'form.cate_1st'(newValue, oldValue) {
      this.cateInfo(newValue, 'cate_2nd')
    },
    'form.cate_2nd'(newValue, oldValue) {
      this.cateInfo(newValue, 'cate_3rd')
    }
  },
  components: {
    MianPotoUploadVue,
    SliderUploadVue
  },
  computed: {
    // 则扣
    discount() {
      let num = ((this.form.price / this.form.marketPrice) * 10).toFixed(2)
      this.form.discount = num
      switch (num) {
        case 'NaN':
          return ''
          break
        case 'Infinity':
          return ''
          break
        default:
          return num
          break
      }
    }
  },
  created() {
    this.cateInfo(1, 'cate_1st')
  },
  methods: {
    async cateInfo(id, cate) {
      if (!id) {
        return false
      }

      let data = await this.getCateList(id)
      // 保存数据
      this[cate + '_options'] = data
      if (data.length == 0) {
        this.form.cate = undefined
      } else {
        // 默认进来选中第一个分类
        this.form[cate] = this[cate + '_options'][0].id
      }
    },

    async getCateList(id) {
      // 调用接口
      let { status, data } = await Category.list({ pId: id })
      if (!status) {
        this.$message({
          message: '获取分类失败',
          type: 'warning'
        })
        return false
      }
      // cate_1st_options
      return Promise.resolve(data)
    }
  }
}
</script>

<style>
</style>