<template>
  <div class="address">
    <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="$router.push('/mine')" />
    <van-address-list v-model="chosenAddressId" :list="list" @add="show = true" />
    <van-popup v-model="show" :style="{ height: '90%', width: '90%' }">
      <van-address-edit :area-list="areaList" show-postal :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
    </van-popup>
  </div>
</template>

<script>
import { Address } from '@/api/index'
import { Toast } from 'vant'
import { areaList } from '@vant/area-data'
export default {
  name: 'Address',
  data() {
    return {
      list: [],
      total: 0,
      chosenAddressId: 0,
      show: false, // 控制添加地址窗口是否显示
      areaList: areaList // 全国地址数据
    }
  },
  created() {
    this.getAddressList()
  },
  methods: {
    async getAddressList() {
      let { status, msg, data, total } = await Address.list()
      if (!status) {
        Toast.fail(msg)
        return false
      }
      this.list = data
      this.list.forEach((item) => {
        item.address = item.province + item.city + item.county + item.street
      })
      this.total = total
    },
    // 添加地址
    async onSave(val) {
      let addressObj = {
        name: val.name,
        tel: val.tel,
        province: val.province,
        city: val.city,
        county: val.county,
        street: val.addressDetail,
        code: val.postalCode,
        isDefault: val.isDefault
      }

      let { status, msg } = await Address.add(addressObj)
      if (!status) {
        Toast.fail(msg)
      } else {
        Toast.success(msg)
        this.show = false
        this.getAddressList()
      }
    }
  }
}
</script>

<style>
</style>