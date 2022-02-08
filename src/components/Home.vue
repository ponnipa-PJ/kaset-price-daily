<template>
  <body>
    <div style="padding: 10px">      
      <div class="container">
        <div style="text-align: center">
      </div>
        <div class="mb-3">
          <div class="mb-3">
            <label for="exampleDataList" class="form-label">ชื่อสินค้า</label>
            <input
              class="form-control"
              list="datalistOptions"
              id="exampleDataList"
              placeholder="เลือกชื่อสินค้า"
              @change="getid"
            />
            <datalist id="datalistOptions" :data="'{!! $data_data !!}'">
              <option
                v-for="(cat, k) in data"
                v-bind:value="cat.product_id"
                :key="k"
              >
                {{ cat.product_name }} {{ cat.sell_type }}
              </option>
            </datalist>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <label class="form-label">ตั้งแต่วันที่</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="start"
                @click="showDate"
              />
            </div>
            <div class="col-6">
              <label class="form-label">ถึงวันที่</label>
              <input
                type="text"
                class="form-control"
                id="description"
                v-model="end"
                @click="showDate"
              />
            </div>
          </div>
          <div class="row" v-if="status">
            <v-date-picker
              v-if="range"
              mode="range"
              v-model="range"
              is-range
              class="m-auto"
              @input="onDateRangeChange"
            >
            </v-date-picker>
          </div>
          <button type="button" class="btn btn-primary mb-3" @click="search">
            ค้นหา
          </button>
        </div>
        <div style="text-align: center">
          <div v-if="load" class="spinner-border mb-3" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-if="pricelist.product_id" class="mb-3">
          <div class="card">
            <div class="row">
              <div class="col-6">
                <div class="card-body">รหัสสินค้า</div>
              </div>
              <div class="col-6">
                <div class="card-body">{{ pricelist.product_id }}</div>
              </div>
              <div class="col-6">
                <div class="card-body">ชื่อสินค้า</div>
              </div>
              <div class="col-6">
                <div class="card-body">{{ pricelist.product_name }}</div>
              </div>
              <div class="col-6">
                <div class="card-body">หมวดหมู่สินค้า</div>
              </div>
              <div class="col-6">
                <div class="card-body">{{ pricelist.category_name }}</div>
              </div>
              <div class="col-6">
                <div class="card-body">กลุ่มสินค้า</div>
              </div>
              <div class="col-6">
                <div class="card-body">{{ pricelist.group_name }}</div>
              </div>
              <div class="col-6">
                <div class="card-body">ราคาต่ำสุดเฉลี่ย</div>
              </div>
              <div class="col-6">
                <div class="card-body">
                  {{ pricelist.price_min_avg }} {{ pricelist.unit }}
                </div>
              </div>
              <div class="col-6">
                <div class="card-body">ราคาสูงสุดเฉลี่ย</div>
              </div>
              <div class="col-6">
                <div class="card-body">
                  {{ pricelist.price_max_avg }} {{ pricelist.unit }}
                </div>
              </div>
            </div>
            <table class="table mb-3">
              <thead>
                <tr>
                  <th scope="col">วันที่สำรวจการขาย</th>
                  <th scope="col">ราคาต่ำสุด (บาท)</th>
                  <th scope="col">ราคาสูงสุด (บาท)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(price, p) in pricelist.price_list" :key="p">
                  <td>{{ formatteddate(price.date) }}</td>
                  <td>{{ price.price_min }}</td>
                  <td>{{ price.price_max }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>      
    </div>
    <div class="footer">
        <p>ข้อมูลเปิดเผยจาก กระทรวงพาณิชย์</p>
      </div>
  </body>
</template>

<script>
import ProductDataService from "../services/product";
import json from '../services/product.json';

export default {
  name: "Home",
  components: {},
  data() {
    return {
      pricelist: [],
      data: json,
      start: null,
      end: null,
      range: {
        start: new Date(),
        // end: new Date("2022-01-10"),
      },
      status: false,
      product_id: 0,
      load: false,
    };
  },
  computed: {
    formattedStart: function () {
      let parsed = new Date(Date.parse(this.range.start));
      let year = parsed.getFullYear();
      let month = ("0" + (parsed.getMonth() + 1)).slice(-2); //force leading zero for month
      let day = ("0" + parsed.getDate()).slice(-2); //force leading zero for day
      return `${year}-${month}-${day}`;
    },
    formattedEnd: function () {
      let parsed = new Date(Date.parse(this.range.end));
      let year = parsed.getFullYear();
      let month = ("0" + (parsed.getMonth() + 1)).slice(-2); //force leading zero for month
      let day = ("0" + parsed.getDate()).slice(-2); //force leading zero for day
      return `${year}-${month}-${day}`;
    },
  },
  methods: {
    formatteddate(date) {
      let parsed = new Date(Date.parse(date));
      let year = parsed.getFullYear();
      let month = ("0" + (parsed.getMonth() + 1)).slice(-2); //force leading zero for month
      let day = ("0" + parsed.getDate()).slice(-2); //force leading zero for day
      return `${day}/${month}/${year}`;
    },
    getid(event) {
      this.pricelist = [];
      this.product_id = event.target.value;
      // console.log(event.target.value);
    },
    onDateRangeChange() {
      this.pricelist = [];
      // console.log(this.range);
      this.start = this.formattedStart;
      this.end = this.formattedEnd;
      // console.log(this.start);
      // console.log(this.end);
      this.status = false;
    },
    showDate() {
      if (this.status === false) {
        this.status = true;
      }
    },
    search() {
      this.pricelist = [];
      if (this.product_id == 0 || this.start == null || this.end == null) {
        alert("กรุณากรอกข้อมูลให้ครบ");
      } else {
        this.load = true;
        ProductDataService.getprice(this.product_id, this.start, this.end)
          .then((response) => {
            // console.log(response.data);
            this.load = false;
            this.pricelist = response.data;
            //   this.datalist.map((item) => {
            //     let key = item.category_name;
            //     return { [key]: item };
            //   });
          })
          .catch((e) => {
            this.load = false;
            console.log(e);
          });
      }
    },
  },
  async mounted() {
  },
};
</script>


<style>
body {
  background-color: bisque;
  bottom: 0;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #072a59;
  color: white;
  text-align: center;
  font-size: 1rem;
}
</style>