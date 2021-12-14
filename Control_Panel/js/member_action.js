const app = new Vue({
    el: '#app',
    data:{
        members:[]
    },
    created: () => {
        axios.get('http://140.115.87.117:8090/getAllMember')
        .then( (response) => {
            result = JSON.parse(response.data.Memberinfo)
            app.members = result
        })
    },
    methods: {
        delete_member: (memberobj) => {
            let member_id = memberobj.member_id
            let member_name = memberobj.name
            let membersArray = app.members

            swal({
                title: `Sure to delete User: ${member_name}?`,
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then((response) => {
                if(response){
                    axios.post('http://140.115.87.117:8090/updateMemberStatus',{"member_id": member_id, "status": 0})
                        .then(() => {
                            let deleted_obj_index = membersArray.indexOf(memberobj)
                            console.log(deleted_obj_index)
                            if (deleted_obj_index > -1)
                                membersArray.splice(deleted_obj_index, 1)
                            swal({
                                title: `${member_name} delete successfully`,
                                icon: "success"
                            })
                        })
                        .catch((error) => {
                            swal({
                                title: `Backend Error`,
                                text: error,
                                icon: 'error'
                            })
                        })                  
                }else{
                    swal({
                        title: 'Cancel',
                        icon: "error"
                    })
                }
                    
            })
        
        },
        update_member: () => {
            
        }

    }
})