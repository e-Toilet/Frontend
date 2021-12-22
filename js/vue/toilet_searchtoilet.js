const searchtoilet = new Vue({
  el: "#searchtoilet",
  data: {
    countries: [],
    cities: [],
    districts: [],
    web: {
      country_name: "",
      city_name: "",
      district_name: "",
    },
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
      "toilet0.jpg",
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
    let param_obj = {};
    if (url.split("?").length > 1) {
      //將?後面的所有參數都分割
      let params = url.split("?")[1].split("&");
      //將參數分割後，分割'='符號的前後文並且將'='前面設定為param_obj的key，後面設定為value
      params.forEach((param) => {
        let temp = param.split("=");
        param_obj[temp[0]] = temp[1];
      });
    }

    if (param_obj.hasOwnProperty("district_id")) {
      axios
        .get(
          `http://140.115.87.117:8090/getToiletByLoc?district_id=${param_obj["district_id"]}`
        )
        .then((response) => {
          result = JSON.parse(response.data.Toiletinfo);
          searchtoilet.toilets = result;
        });
    } else if (
      param_obj.hasOwnProperty("longitude") &&
      param_obj.hasOwnProperty("latitude")
    ) {
      axios
        .get(
          `http://140.115.87.117:8090/getToiletByLongitude?longitude=${param_obj["longitude"]}&latitude=${param_obj["latitude"]}`
        )
        .then((response) => {
          console.log(response);
          result = JSON.parse(response.data.Toiletinfo);
          searchtoilet.toilets = result;
        });
    } else {
      return;
    }
  },
  mounted: () => {},
  methods: {
    createto: function (e) {
      //新增廁所
      let checkIsInputedAndLegal =
        searchtoilet.create_toilet.name &&
        searchtoilet.create_toilet.address &&
        searchtoilet.create_toilet.longitude &&
        searchtoilet.create_toilet.latitude &&
        searchtoilet.create_toilet.country_id &&
        searchtoilet.create_toilet.city_id &&
        searchtoilet.create_toilet.district_id;
      if (checkIsInputedAndLegal) {
        axios
          .post(
            "http://140.115.87.117:8090/createNewToilet",
            searchtoilet.create_toilet
          )
          .then((response) => {
            result = response.data;
            alert("新增成功");
            self.location.reload();
          })
          .catch(() => {
            alert("新增失敗！請再試一次");
          });
      }

      //檢查所有新增欄位有沒有填寫
      for (let key in searchtoilet.create_toilet) {
        let value = searchtoilet.create_toilet[key];
        switch (key) {
          case "country_id":
            if (!value || value == "-1") alert("國家欄位為必選.");
            break;
          case "city_id":
            if (!value || value == "-1") alert("城市欄位為必選.");
            break;
          case "district_id":
            if (!value || value == "-1") alert("地區欄位為必選.");
            break;
          default:
            if (!value) alert(key + " 為必填寫！");
        }
      }
      e.preventDefault();
    },
    JumpToToilet: (toilet_id) => {
      //顯示廁所詳細
      location.href = `toiletcontent.html?toilet_id=${toilet_id}`;
    },
    getCountryName: (country_id) => {
      if (searchtoilet.web.country_name) return searchtoilet.web.country_name;

      searchtoilet.countries.forEach((country) => {
        if (country.country_id == country_id)
          searchtoilet.web.country_name = country.country_name;
        return searchtoilet.web.country_name;
      });
    },
    getCityName: (city_id) => {
      if (searchtoilet.web.city_name) return searchtoilet.web.city_name;

      searchtoilet.cities.forEach((city) => {
        if (city.city_id == city_id)
          searchtoilet.web.city_name = city.city_name;
        return searchtoilet.web.city_name;
      });
    },
    getDistrictName: (district_id) => {
      if (searchtoilet.web.district_name) return searchtoilet.web.district_name;

      searchtoilet.districts.forEach((district) => {
        if (district.district_id == district_id)
          searchtoilet.web.district_name = district.district_name;
        return searchtoilet.web.district_name;
      });
    },
  },
});
