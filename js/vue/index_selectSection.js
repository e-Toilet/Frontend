const searchtoilet = new Vue({
  el: "#searchtoilet",
  data: {
    countries: [],
    cities: [],
    districts: [],
    selected: {
      longitude: 0.0,
      latitude: 0.0,
      country_id: "-1",
      city_id: "-1",
      district_id: "-1",
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
    isShow: false,
  },
  created: () => {
    axios
      .get("http://140.115.87.117:8090/getAllLoc")
      .then((response) => {
        searchtoilet.countries = JSON.parse(response.data.CountryInfo);
        searchtoilet.cities = JSON.parse(response.data.CityInfo);
        searchtoilet.districts = JSON.parse(response.data.DistrictInfo);
      })
      .catch(() => {
        console.log("Encounter error");
      });
  },
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
    JumpToSearch: (district_id) => {
      //使用區域搜尋
      if (
        !searchtoilet.selected.country_id ||
        searchtoilet.selected.country_id == "-1"
      ) {
        alert("國家欄位為必選.");
      } else if (
        !searchtoilet.selected.city_id ||
        searchtoilet.selected.city_id == "-1"
      ) {
        alert("城市欄位為必選.");
      } else if (
        !searchtoilet.selected.district_id ||
        searchtoilet.selected.district_id == "-1"
      ) {
        alert("地區欄位為必選.");
      } else {
        location.href = `toilet.html?district_id=${district_id}`;
      }
    },
    getLocation: async () => {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            //成功後回傳resolve
            resolve(position);
          },
          (err) => {
            //失敗後回傳reject
            reject(err);
          }
        );
      });
    },
    create_showPosition: async () => {
      //新增廁所的經緯度
      await searchtoilet.getLocation().then((position) => {
        searchtoilet.isShow = true;
        searchtoilet.create_toilet.longitude = position.coords.longitude;
        searchtoilet.create_toilet.latitude = position.coords.latitude;
      });
    },
    PositionToSearch: async () => {
      //找附近的function
      searchtoilet.selected.longitude = searchtoilet.selected.latitude = "";
      await searchtoilet.getLocation().then((position) => {
        searchtoilet.selected.longitude = position.coords.longitude;
        searchtoilet.selected.latitude = position.coords.latitude;
      });
    },
    JumpToLngLat: (lng, lat) => {
      location.href = `toilet.html?longitude=${lng}&lat=${lat}`;
    },
  },
});
