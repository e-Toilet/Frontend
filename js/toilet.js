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
        rating: "",
        content: "",
        review_info: {},
    },
    created: () => {
        let url = location.href
        let toilet_id
        console.log(url)
        try{
            let toilet = url.split('?')[1].split('&')[0]
                toilet_id = toilet.split('=')[1]

        }
        catch(error){

        }
        
        axios.get('http://140.115.87.117:8090/getToiletByLoc?district_id=36')
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toilets = result
                // console.log(result)
            })
        axios.get(`http://140.115.87.117:8090/getToiletByID?toilet_id=${toilet_id}`)
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toiletinfo = result
                //                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getReview?toilet_id=1')
            .then((response) => {
                result = JSON.parse(response.data.Reviewinfo)
                showtoilet.reviews = result
                // console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getMemberInfo?member_id=112')
            .then((response) => {
                result = JSON.parse(response.data.Memberinfo)
                showtoilet.account = result
                //                console.log(result)
            })
    },
    methods: {
        createcommet: function (e) {
            let check = this.rating
            if (check) {
                axios.post('http://140.115.87.117:8090/CreateNewReview', {
                        rating: showtoilet.rating,
                        member_id: 12,
                        toilet_id: 1,
                        content: showtoilet.content
                    })
                    .then((response) => {
                        result = response.data
                        alert("新增評論成功")
                        console.log(rating)
                        console.log(member_id)
                        console.log(toilet_id)
                        console.log(content)

                        self.location.reload()
                    })
                    .catch((error) => {
                        alert("新增失敗！")
                        return
                    })
            }
            if (!this.reviewstar) {
                alert('星等必選.');
            }
            e.preventDefault();
        },
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
        JumpToToilet: (toilet_id) => {
            location.href = `toiletcontent.html?toilet_id=${toilet_id}`
        }

    },
});
