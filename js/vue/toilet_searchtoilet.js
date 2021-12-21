const searchtoilet = new Vue({
  el: "#searchtoilet",
  data: {
    countries: [],
    cities: [],
    districts: [],
    create_toilet: {
      name: "",
      address: "",
      longitude: "",
      latitude: "",
      country_id: "-1",
      city_id: "-1",
      district_id: "-1",
    },
    images: [
      "toilet.jpg",
      "toilet1.jpg",
      "toilet2.jpg",
      "toilet3.jpg",
      "toilet4.jpg",
      "toilet5.jpg",
      "toilet6.jpg",
      "toilet7.jpg",
      "toilet8.jpeg",
      "toilet9.jpg",
      "toilet10.jpg",
      "toilet11.jpg",
      "toilet12.jpg",
      "toilet13.jpg",
      "toilet14.jpg",
      "toilet15.jpg",
      "toilet16.jpg",
      "toilet17.jpg",
      "toilet18.jpg",
      "toilet19.jpg",
      "toilet20.jpg",
    ],
    toilets: [],
  },
  created: () => {
    //取得所有關於country, city and district的資訊
    axios.get("http://140.115.87.117:8090/getAllLoc").then((response) => {
      searchtoilet.countries = JSON.parse(response.data.CountryInfo);
      searchtoilet.cities = JSON.parse(response.data.CityInfo);
      searchtoilet.districts = JSON.parse(response.data.DistrictInfo);
    });

    let url = location.href;
    let district_id;
    let toilet_id;
    console.log(url);
    try {
      let district = url.split("?")[1].split("&")[0];
      district_id = district.split("=")[1];
      let toilet = url.split("?")[1].split("&")[0];
      toilet_id = toilet.split("=")[1];
    } catch (error) {}
    axios
      .get(
        `http://140.115.87.117:8090/getToiletByLoc?district_id=${district_id}`
      )
      .then((response) => {
        result = JSON.parse(response.data.Toiletinfo);
        searchtoilet.toilets = result;
      });
    axios
      .get(`http://140.115.87.117:8090/getToiletByID?toilet_id=${toilet_id}`)
      .then((response) => {
        result = JSON.parse(response.data.Toiletinfo);
        showtoilet.toiletinfo = result;
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
            address: searchtoilet.address,
            longitude: searchtoilet.longitude,
            latitude: searchtoilet.latitude,
            country: searchtoilet.create.country_id,
            city: searchtoilet.create.city_id,
            district: searchtoilet.create.district_id,
            name: searchtoilet.name,
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
    JumpToSearch: function (district_id) {
      let checksearch =
        this.selected.country_id &&
        this.selected.city_id &&
        this.selected.district_id &&
        this.selected.district_id != -1;
      console.log(checksearch);
      if (checksearch) {
        location.href = `toilet.html?district_id=${district_id}`;
      }
      if (!this.selected.country_id) {
        alert("國家欄位為必選.");
      } else if (this.selected.country_id == "-1") {
        alert("國家欄位為必選.");
      }
      if (!this.selected.city_id) {
        alert("城市欄位為必選.");
      } else if (this.selected.city_id == "-1") {
        alert("城市欄位為必選.");
      }
      if (!this.selected.district_id) {
        alert("地區欄位為必選.");
      } else if (this.selected.district_id == "-1") {
        alert("地區欄位為必選.");
      }
    },
    JumpToToilet: (toilet_id) => {
      //顯示廁所詳細
      location.href = `toiletcontent.html?toilet_id=${toilet_id}`;
    },
  },
});
