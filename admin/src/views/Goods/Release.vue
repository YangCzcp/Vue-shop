<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布商品</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类">
          <el-select v-model="form.cate_1st" placeholder="请选择活动区域">
            <el-option :label="item.name" v-for="(item, index) in cate_1st_options" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <el-select v-model="form.cate_2nd" placeholder="请选择活动区域">
            <el-option :label="item.name" v-for="(item, index) in cate_2nd_options" :value="item.id" :key="item.id"></el-option>
          </el-select>
          <el-select v-model="form.cate_3rd" placeholder="请选择活动区域">
            <el-option :label="item.name" v-for="(item, index) in cate_3rd_options" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="marketPrice">
          <el-input v-model.number="form.marketPrice"></el-input>
        </el-form-item>
        <el-form-item label="成本价" prop="cost">
          <el-input v-model.number="form.cost"></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discount">
          <el-input :disabled="true" v-model.number="discount"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input v-model.number="form.inventory"></el-input>
        </el-form-item>
        <el-form-item label="货号" prop="articleNo">
          <el-input v-model="form.articleNo"></el-input>
        </el-form-item>
        <el-form-item label="主图" prop="img_md">
          <MainPhotoUpload action="/upload/goods" :url.sync="form.img_md" :img-lg.sync="form.img_lg"></MainPhotoUpload>
        </el-form-item>
        <el-form-item label="轮播图" prop="slider">
          <SliderUpload action="/upload/slider" v-model="form.slider"></SliderUpload>
        </el-form-item>
        <el-form-item label="详情">
          <div id="editor"></div>
        </el-form-item>
        <el-form-item label="运费" prop="freight">
          <el-input v-model.number="form.freight"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发布商品</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Category, Goods } from '@/api/index'

import MainPhotoUpload from '@/components/MainPhotoUpload.vue'
import SliderUpload from '@/components/SliderUpload.vue'
import E from 'wangeditor'
export default {
  name: 'Release',
  data() {
    return {
      form: {
        cate_1st: '', // 保存一级分类选则后的值  ----id
        cate_2nd: '',
        cate_3rd: '',
        name: '', // 商品名称
        price: 0, // 售卖价格
        hotPoint: '',
        marketPrice: 0, // 市场价格
        cost: 0, // 成本价
        discount: '', // 折扣
        inventory: 0, // 库存
        articleNo: '', // 货号
        img_lg: '', // 大图
        img_md: '', // 小图
        slider: '', // 轮播图
        brand: '自营',
        detail: '', // 详情
        freight: 0 // 运费
      },
      cate_1st_options: [], // 一级分类的所有数据
      cate_2nd_options: [],
      cate_3rd_options: [],
      rules: {
        name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
        parice: [{ required: true, message: '请填写价格', trigger: 'blur' }],
        marketPrice: [{ required: true, message: '请填写市场价格', trigger: 'blur' }],
        cost: [{ required: true, message: '请填写成本价格', trigger: 'blur' }],
        discount: [{ required: true, message: '请计算则扣', trigger: 'blur' }],
        articleNo: [{ required: true, message: '请填写货号', trigger: 'blur' }],
        img_lg: [{ required: true, message: '请选择主图', trigger: 'blur' }],
        slider: [{ required: true, message: '请选择轮播图', trigger: 'blur' }],
        freight: [{ required: true, message: '请填写运费', trigger: 'blur' }]
      }
    }
  },
  components: {
    MainPhotoUpload,
    SliderUpload
  },
  computed: {
    discount() {
      // return ((this.form.price / this.form.marketPrice) * 10).toFixed(2)
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
  // 监听属性
  watch: {
    'form.cate_1st'(newValue, oldValue) {
      this.handelCate(newValue, 'cate_2nd')
    },
    'form.cate_2nd'(newValue, oldValue) {
      this.handelCate(newValue, 'cate_3rd')
    }
  },
  created() {
    this.handelCate(1, 'cate_1st')
  },
  mounted() {
    const editor = new E('#editor')
    // 配置富文本编辑器图片上传地址
    editor.config.uploadImgServer = '/upload/editor'
    editor.config.uploadFileName = 'file'
    editor.config.uploadImgHeaders = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
    editor.config.uploadImgHooks = {
      customInsert: function (insertImgFn, result) {
        insertImgFn(result.data.url)
      }
    }
    editor.config.onchange = (html) => {
      this.form.detail = html
    }
    editor.create()
  },
  methods: {
    // 处理数据
    async handelCate(id, cate) {
      if (!id) {
        this.form[cate] = undefined
        return false
      }
      let data = await this.getCateList(id)
      this[cate + '_options'] = data
      if (data.length == 0) {
        this.form[cate] = undefined
        return false
      }
      this.form[cate] = this[cate + '_options'][0].id
    },
    // 发起请求获取分类的数据
    async getCateList(id) {
      let { status, data } = await Category.list({ pId: id })
      if (!status) {
        this.$message.error('分类信息获取失败')
        return false
      }
      return Promise.resolve(data)
    },
    // 发布商品
    submitForm() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let { status, msg } = await Goods.add(this.form)
          if (!status) {
            this.$message.error(msg)
          } else {
            this.$message.success(msg)
            this.$router.push('/goods')
          }
        } else {
          this.$message.error('请填写完整信息')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>