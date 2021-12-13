const app = new Vue({
    el: '#app',
    data: {
        toilets: []
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getAllToilet')
                .then( (response) => {
                    result = JSON.parse(response.data.Toiletinfo)
                    app.toilets = result  
                })
    },
    methods: {
        delete_toilet: (toilet_id, toilet_name) => {
            swal({
                title: `Sure to delete ${toilet_name}?`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then(() => {
                swal({
                    title: `${toilet_name} delete successfully`,
                    icon: "success"
                })
            })
        },
        update_toilet: (toilet_obj) => {
            // let { value: formValues } = await Swal.fire({
            //     title: 'Multiple inputs',
            //     html:
            //         '<label for="swal-input1">Name: </label>'+
            //         '<input id="swal-input1" class="swal2-input">' +
            //         '<label for="swal-input2">Country: </label>'+
            //         '<input id="swal-input2" class="swal2-input">' +
            //         '<label for="swal-input3">City: </label>'+
            //         '<input id="swal-input3" class="swal2-input">' +
            //         '<label for="swal-input4">District: </label>'+
            //         '<input id="swal-input4" class="swal2-input">' +
            //         '<label for="swal-input5">Longtitude: </label>'+
            //         '<input id="swal-input5" class="swal2-input">' +
            //         '<label for="swal-input6">Latiutude: </label>'+
            //         '<input id="swal-input6" class="swal2-input">',
            //     focusConfirm: false,
            //     preConfirm: () => {
            //         return [
            //         document.getElementById('swal-input1').value,
            //         document.getElementById('swal-input2').value
            //         ]
            //     }
            // })

            // if (formValues) {
            //     Swal.fire(JSON.stringify(formValues))
            // }
            
        }
    }
})