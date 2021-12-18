const showtoilet = new Vue({
    el: '#showtoilet',
    data: {
        toilets: [],
        toiletinfo: [],
        reviews: [],
        countries: [],
        cities: [],
        districts: [],
        account: [],
        review_info: {},
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getToiletByLoc?district_id=36')
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toilets = result
            })
        axios.get('http://140.115.87.117:8090/getToiletByID?toilet_id=1')
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toiletinfo = result
                //                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getReview?toilet_id=1')
            .then((response) => {
                result = JSON.parse(response.data.Reviewinfo)
                showtoilet.reviews = result
                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getMemberInfo?member_id=112')
            .then((response) => {
                result = JSON.parse(response.data.Memberinfo)
                showtoilet.account = result
                console.log(result)
            })
    },
    methods: {
        delete_myreview: (reviewobj) => {
            let review_id = reviewobj.review_id;
            let reviewsArray = showtoilet.reviews;

            swal({
                title: `確認刪除你的評論嗎?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((response) => {
                if (response) {
                    axios
                        .post("http://140.115.87.117:8090/deleteReview", {
                            review_id: review_id,
                        })
                        .then(() => {
                            let deleted_obj_index = reviewsArray.indexOf(reviewobj);
                            console.log(deleted_obj_index);
                            if (deleted_obj_index > -1)
                                reviewsArray.splice(deleted_obj_index, 1);
                            swal({
                                title: `刪除成功`,
                                icon: "success",
                            });
                        })
                        .catch((error) => {
                            swal({
                                title: `刪除失敗`,
                                text: error,
                                icon: "error",
                            });
                        });
                } else {
                    swal({
                        title: "取消",
                        icon: "error",
                    });
                }
            });
        },
        delete_review: (reviewobj) => {
            let review_id = reviewobj.review_id;
            let reviewsArray = showtoilet.reviews;

            swal({
                title: `確認刪除此評論嗎?`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((response) => {
                if (response) {
                    axios
                        .post("http://140.115.87.117:8090/deleteReview", {
                            review_id: review_id,
                        })
                        .then(() => {
                            let deleted_obj_index = reviewsArray.indexOf(reviewobj);
                            console.log(deleted_obj_index);
                            if (deleted_obj_index > -1)
                                reviewsArray.splice(deleted_obj_index, 1);
                            swal({
                                title: `刪除成功`,
                                icon: "success",
                            });
                        })
                        .catch((error) => {
                            swal({
                                title: `刪除失敗`,
                                text: error,
                                icon: "error",
                            });
                        });
                } else {
                    swal({
                        title: "取消",
                        icon: "error",
                    });
                }
            });
        },
        update_review: () => {
            console.log(showtoilet.review_info)
            let checkIsInputedAndLegal = this.rating
            if (checkIsInputedAndLegal) {
                axios
                    .post("http://140.115.87.117:8090/updateReview", showtoilet.review_info)
                    .then(() => {
                        swal({
                            title: "修改成功",
                            icon: "success",
                        })
                        //  showtoilet.review_info
                        showtoilet.review_info[showtoilet.review_info.review_id - 1] = showtoilet.review_info
                    })
                    .catch((error) => {
                        error_msg = error.response.data.error
                        console.log()
                        swal({
                            title: "修改失敗",
                            text: error_msg,
                            icon: "error",
                        });
                    })
            }
             if (!this.rating) {
                alert('星等必選.');
            }
        },
        SendReviewInfo: (reviewobj) => {
            showtoilet.review_info = reviewobj;
        },

    },
});
