const app = new Vue({
  el: "#app",
  data: {
    account: {},
    comment: 0,
  },
  created: () => {
    axios
      .get("http://140.115.87.117:8090/getMemberInfo?member_id=112")
      .then((response) => {
        result = JSON.parse(response.data.Memberinfo);
        app.account = result[0];
        //                console.log(result)
      });
    axios
      .get("http://140.115.87.117:8090/getMemberReviewCount?member_id=112")
      .then((response) => {
        result = JSON.parse(response.data.Review_count);
        app.comment = result;
        console.log(result);
      });
  },
  methods: {
   
  },
});
