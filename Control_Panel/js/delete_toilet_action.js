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
    axios.get("https://etoilet.ddns.net:8090/getAllToilet").then((response) => {
      result = JSON.parse(response.data.Toiletinfo);
      app.toilets = result;
    });
    axios
      .get("https://etoilet.ddns.net:8090/getAllLoc")
      .then((response) => {
          app.countries = JSON.parse(response.data.CountryInfo);
          app.cities = JSON.parse(response.data.CityInfo);
          app.districts = JSON.parse(response.data.DistrictInfo);
      })
  },
  methods: {
    confirm_toilet: (toiletobj) => {
      let toilet_id = toiletobj.toilet_id;
      let toilet_name = toiletobj.name;
      let toiletsArray = app.toilets;

      swal({
        title: `Undelete ${toilet_name} toilet?`,
        icon: "info",
        buttons: true,
        dangerMode: false,
      }).then((response) => {
        if (response) {
          axios
            .post("https://etoilet.ddns.net:8090/updateToilet", {
              toilet_id: toilet_id,
              status: 1,
            })
            .then(() => {
              let deleted_obj_index = toiletsArray.indexOf(toiletobj);
              if (deleted_obj_index > -1)
                toiletsArray.splice(deleted_obj_index, 1);
              swal({
                title: `${toilet_name} undelete successfully`,
                icon: "success",
              }).then(()=>{
                location.reload()
              })
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
      console.log(app.toilet_info)
      axios
        .post("https://etoilet.ddns.net:8090/updateToilet", app.toilet_info)
        .then(() => {
          swal({
            title: "Toilet update Successfully",
            icon: "success",
          })
          // app.toilets
          app.toilets[app.toilet_info.toilet_id-1] = app.toilet_info
        })
        .catch((error) => {
          error_msg = error.response.data.error
          console.log()
          swal({
            title: "Encountered an error message",
            text: error_msg,
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
