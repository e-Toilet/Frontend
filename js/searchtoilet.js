const searchtoilet = new Vue({
  el: "#searchtoilet",
  data: {
    countries: [],
    cities: [],
    districts: [],
    selected: {
      country_id: "-1",
      city_id: "-1",
      district_id: "-1",
    },
    create: {
      country_id: "-1",
      city_id: "-1",
      district_id: "-1",
    },
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    country: "",
    city: "",
    district: "",
  },
  created: () => {
    axios.get("http://140.115.87.117:8090/getAllCountry").then((response) => {
      result = JSON.parse(response.data.CountryInfo);
      searchtoilet.countries = result;
      console.log(result);
    });
    axios.get("http://140.115.87.117:8090/getAllCity").then((response) => {
      result = JSON.parse(response.data.CityInfo);
      searchtoilet.cities = result;
    });
    axios.get("http://140.115.87.117:8090/getAllDistrict").then((response) => {
      result = JSON.parse(response.data.DistrictInfo);
      searchtoilet.districts = result;
    });
  },
  methods: {
    createto: function (e) {
      let checkIsInputedAndLegal =
        this.name &&
        this.address &&
        this.longitude &&
        this.latitude &&
        this.create.country_id &&
        this.create.city_id &&
        this.create.district_id;
      if (checkIsInputedAndLegal) {
        axios
          .post("http://140.115.87.117:8090/createNewToilet", {
            address: app.address,
            longitude: app.longitude,
            latitude: app.latitude,
            country: app.create.country_id,
            city: app.create.city_id,
            district: app.create.district_id,
            name: app.name,
          })
          .then((response) => {
            result = response.data;
            alert("新增成功");
            self.location.reload();
          })
          .catch((error) => {
            alert("新增失敗！請再試一次");
            return;
          });
      }
      if (!this.name) {
        alert("廁所名稱欄位為必填.");
      }
      if (!this.create.country_id) {
        alert("國家欄位為必選.");
      } else if (this.create.country_id == "-1") {
        alert("國家欄位為必選.");
      }
      if (!this.create.city_id) {
        alert("城市欄位為必選.");
      } else if (this.create.city_id == "-1") {
        alert("城市欄位為必選.");
      }
      if (!this.create.district_id) {
        alert("地區欄位為必選.");
      } else if (this.create.district_id == "-1") {
        alert("地區欄位為必選.");
      }
      if (!this.address) {
        alert("地址欄位為必填.");
      }
      if (!this.longitude) {
        alert("經緯度欄位為必填.");
      } else if (!this.latitude) {
        alert("經緯度欄位為必填.");
      }
      e.preventDefault();
    },
    searchto: () => {
      if (!searchtoilet.selected.country_id) {
        alert("國家欄位為必選.");
      } else if (searchtoilet.selected.country_id == "-1") {
        alert("國家欄位為必選.");
      }
      if (!searchtoilet.selected.city_id) {
        alert("城市欄位為必選.");
      } else if (searchtoilet.selected.city_id == "-1") {
        alert("城市欄位為必選.");
      }
      if (!searchtoilet.selected.district_id) {
        alert("地區欄位為必選.");
      } else if (searchtoilet.selected.district_id == "-1") {
        alert("地區欄位為必選.");
      } else {
        location.href = `./toilet.html?district_id=${searchtoilet.selected.district_id}`;
      }
    },
    //        AddLocation: function (e) {
    //            if (navigator.geolocation) {
    //                //取得 經緯度
    //                navigator.geolocation.getCurrentPosition(this.options.methods.addPosition.bind(this)); //有拿到位置就呼叫 showPosition 函式
    //            } else {
    //                //沒有支援呼叫地理位置功能的瀏覽器
    //            }
    //        },
    //        addPosition: function (pos) {
    //            this.longitude.attr("type", "show").show();
    //            this.longitude.attr("placeholder", pos.coords.longitude).show();
    //            this.latitude.attr("type", "show").show();
    //            this.latitude.attr("placeholder", pos.coords.latitude).show();
    //        }
  },
});
