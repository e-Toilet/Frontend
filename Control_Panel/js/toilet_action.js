const app = new Vue({
  el: "#app",
  data: {
    toilets: [],
    toilet_info: {},
    countries: [],
    cities: [],
    districts: [],
  },
  created: () => {
    axios.get("http://140.115.87.117:8090/getAllToilet").then((response) => {
      result = JSON.parse(response.data.Toiletinfo);
      app.toilets = result;
    });
    axios.get("http://140.115.87.117:8090/getAllCountry").then((response) => {
      app.countries = JSON.parse(response.data.CountryInfo);
    });
    axios.get("http://140.115.87.117:8090/getAllCity").then((response) => {
      app.cities = JSON.parse(response.data.CityInfo);
    });
    axios.get("http://140.115.87.117:8090/getAllDistrict").then((response) => {
      app.districts = JSON.parse(response.data.DistrictInfo);
    });
  },
  methods: {
    delete_toilet: (toiletobj) => {
      let toilet_id = toiletobj.toilet_id;
      let toilet_name = toiletobj.name;
      let toiletsArray = app.toilets;

      swal({
        title: `Sure to delete ${toilet_name}?`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((response) => {
        if (response) {
          axios
            .post("http://140.115.87.117:8090/deleteToilet", {
              toilet_id: toilet_id,
            })
            .then(() => {
              let deleted_obj_index = toiletsArray.indexOf(toiletobj);
              console.log(deleted_obj_index);
              if (deleted_obj_index > -1)
                toiletsArray.splice(deleted_obj_index, 1);
              swal({
                title: `${toilet_name} delete successfully`,
                icon: "success",
              });
            })
            .catch((error) => {
              swal({
                title: `Backend Error`,
                text: error,
                icon: "error",
              });
            });
        } else {
          swal({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
    },
    update_toilet: () => {
      //   toiletobj = app.toilet_info;
      //   delete toiletobj["avg_rating"];
      //   delete toiletobj["status"];
      axios
        .post("http://140.115.87.117:8090/updateToilet", app.toilet_info)
        .then((response) => {
          swal({
            title: "Toilet update Successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          swal({
            title: "Encounter error message",
            text: error,
            icon: "error",
          });
        });
    },
    SendToiletInfo: (toiletobj) => {
      app.toilet_info = toiletobj;
    },
    checkInputLegal: (input) => {
      return String(input).length > 0;
    },
  },
});
