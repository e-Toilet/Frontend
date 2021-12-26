const searchtoilet = new Vue({
    el: '#searchtoilet',
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
        toilets: [],
        toiletinfo: [],
    },
    created: () => {
        let url = location.href
        let district_id
        let toilet_id
        console.log(url)
        try {
            let district = url.split('?')[1].split('&')[0]
            district_id = district.split('=')[1]
            let toilet = url.split('?')[1].split('&')[0]
            toilet_id = toilet.split('=')[1]
        } catch (error) {

        }
        axios.get(`http://140.115.87.117:8090/getToiletByLoc?district_id=${district_id}`)
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                searchtoilet.toilets = result
                console.log(result)
            })
        axios.get(`http://140.115.87.117:8090/getToiletByID?toilet_id=${toilet_id}`)
            .then((response) => {
                result = JSON.parse(response.data.Toiletinfo)
                showtoilet.toiletinfo = result
                //                console.log(result)
            })
        axios.get('http://140.115.87.117:8090/getAllLoc')
            .then((response) => {
                result = JSON.parse(response.data.CountryInfo)
                result1 = JSON.parse(response.data.CityInfo)
                result2 = JSON.parse(response.data.DistrictInfo)
                searchtoilet.countries = result
                searchtoilet.cities = result1
                searchtoilet.districts = result2
                console.log(result)
            })
    },
    methods: {
        createto: function (e) {
            let checkIsInputedAndLegal = this.name && this.address && this.longitude && this.latitude && this.create.country_id && this.create.city_id && this.create.district_id
            if (checkIsInputedAndLegal) {
                axios.post('http://140.115.87.117:8090/createNewToilet', {
                        address: searchtoilet.address,
                        longitude: searchtoilet.longitude,
                        latitude: searchtoilet.latitude,
                        country: searchtoilet.create.country_id,
                        city: searchtoilet.create.city_id,
                        district: searchtoilet.create.district_id,
                        name: searchtoilet.name
                    })
                    .then((response) => {
                        swal({
                            title: "新增成功",
                            icon: "success",
                        }).then(function () {
                            self.location.reload();
                        })
                    })
                    .catch((error) => {
                        swal({
                            title: "新增失敗",
                            icon: "error",
                        });
                    })
            }
            if (!this.name) {
                alert('廁所名稱欄位為必填.');
            }
            if (!this.create.country_id) {
                alert('國家欄位為必選.');
            } else if (this.create.country_id == "-1") {
                alert('國家欄位為必選.');
            }
            if (!this.create.city_id) {
                alert('城市欄位為必選.');
            } else if (this.create.city_id == "-1") {
                alert('城市欄位為必選.');
            }
            if (!this.create.district_id) {
                alert('地區欄位為必選.');
            } else if (this.create.district_id == "-1") {
                alert('地區欄位為必選.');
            }
            if (!this.address) {
                alert('地址欄位為必填.');
            }
            if (!this.longitude) {
                alert('經緯度欄位為必填.');
            } else if (!this.latitude) {
                alert('經緯度欄位為必填.');
            }
            e.preventDefault();
        },
        JumpToSearch: function (district_id) {
            let checksearch = this.selected.country_id && this.selected.city_id && this.selected.district_id && (this.selected.district_id != -1)
            console.log(checksearch)
            if (checksearch) {
                location.href = `toilet.html?district_id=${district_id}`
            }
            if (!this.selected.country_id) {
                alert('國家欄位為必選.');
            } else if (this.selected.country_id == "-1") {
                alert('國家欄位為必選.');
            }
            if (!this.selected.city_id) {
                alert('城市欄位為必選.');
            } else if (this.selected.city_id == "-1") {
                alert('城市欄位為必選.');
            }
            if (!this.selected.district_id) {
                alert('地區欄位為必選.');
            } else if (this.selected.district_id == "-1") {
                alert('地區欄位為必選.');
            }
        },
        JumpToToilet: (toilet_id) => {
            location.href = `toiletcontent.html?toilet_id=${toilet_id}`
        }
    },
})
