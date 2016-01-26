Template.module.helpers({
	students: function(){
		if (Session.get("students")) {
			return Session.get("students");
		} else {
			return [];
		}/*[  
				   {  
				      "index":1,
				      "id":12328663,
				      "name":"Benjamin Dean",
				      "attendance":84
				   },
				   {  
				      "index":2,
				      "id":14680106,
				      "name":"Ashley Cole",
				      "attendance":69
				   },
				   {  
				      "index":3,
				      "id":14757672,
				      "name":"Harry Ramirez",
				      "attendance":62
				   },
				   {  
				      "index":4,
				      "id":13364671,
				      "name":"Wayne Ramirez",
				      "attendance":80
				   },
				   {  
				      "index":5,
				      "id":12862631,
				      "name":"Lisa Carpenter",
				      "attendance":99
				   },
				   {  
				      "index":6,
				      "id":17973524,
				      "name":"Dorothy Duncan",
				      "attendance":51
				   },
				   {  
				      "index":7,
				      "id":12107249,
				      "name":"Jerry Howell",
				      "attendance":10
				   },
				   {  
				      "index":8,
				      "id":14822324,
				      "name":"Angela Medina",
				      "attendance":98
				   },
				   {  
				      "index":9,
				      "id":17440961,
				      "name":"Margaret Barnes",
				      "attendance":41
				   },
				   {  
				      "index":10,
				      "id":12808539,
				      "name":"Frank Chapman",
				      "attendance":35
				   },
				   {  
				      "index":11,
				      "id":18766414,
				      "name":"Carolyn Garza",
				      "attendance":35
				   },
				   {  
				      "index":12,
				      "id":15236916,
				      "name":"Laura Butler",
				      "attendance":66
				   },
				   {  
				      "index":13,
				      "id":19762492,
				      "name":"Susan White",
				      "attendance":96
				   },
				   {  
				      "index":14,
				      "id":19270445,
				      "name":"Denise Baker",
				      "attendance":86
				   },
				   {  
				      "index":15,
				      "id":12807984,
				      "name":"Robert Bailey",
				      "attendance":20
				   },
				   {  
				      "index":16,
				      "id":15277774,
				      "name":"Phillip Castillo",
				      "attendance":5
				   },
				   {  
				      "index":17,
				      "id":16274223,
				      "name":"Adam Martinez",
				      "attendance":83
				   },
				   {  
				      "index":18,
				      "id":15548678,
				      "name":"Linda Carter",
				      "attendance":10
				   },
				   {  
				      "index":19,
				      "id":15424182,
				      "name":"Gloria Black",
				      "attendance":60
				   },
				   {  
				      "index":20,
				      "id":19262407,
				      "name":"Willie Shaw",
				      "attendance":34
				   },
				   {  
				      "index":21,
				      "id":13279967,
				      "name":"Lori Vasquez",
				      "attendance":70
				   },
				   {  
				      "index":22,
				      "id":15849433,
				      "name":"Robert Stanley",
				      "attendance":52
				   },
				   {  
				      "index":23,
				      "id":11805012,
				      "name":"Marilyn Allen",
				      "attendance":81
				   },
				   {  
				      "index":24,
				      "id":18183966,
				      "name":"Bonnie Knight",
				      "attendance":85
				   },
				   {  
				      "index":25,
				      "id":14781144,
				      "name":"Sarah Hart",
				      "attendance":90
				   },
				   {  
				      "index":26,
				      "id":13893038,
				      "name":"Martin Greene",
				      "attendance":52
				   },
				   {  
				      "index":27,
				      "id":11251667,
				      "name":"Donna Garrett",
				      "attendance":62
				   },
				   {  
				      "index":28,
				      "id":11213511,
				      "name":"Joe Harris",
				      "attendance":84
				   },
				   {  
				      "index":29,
				      "id":16492353,
				      "name":"Wanda Lynch",
				      "attendance":69
				   },
				   {  
				      "index":30,
				      "id":11985286,
				      "name":"Ernest Webb",
				      "attendance":89
				   },
				   {  
				      "index":31,
				      "id":14298880,
				      "name":"Kevin Knight",
				      "attendance":66
				   },
				   {  
				      "index":32,
				      "id":15144986,
				      "name":"Katherine Edwards",
				      "attendance":10
				   },
				   {  
				      "index":33,
				      "id":12860143,
				      "name":"Emily Evans",
				      "attendance":29
				   },
				   {  
				      "index":34,
				      "id":18430695,
				      "name":"Kenneth Shaw",
				      "attendance":57
				   },
				   {  
				      "index":35,
				      "id":18810674,
				      "name":"Chris Lopez",
				      "attendance":28
				   }
				];*/
	},
	module_name: function(){
		return Session.get("module_name");
	},
	module_code: function(){
		return Session.get("module_code");
	}
});

Template.module.onCreated(function() {

    Meteor.call('getModuleAttendance', this.data.moduleID, function(err, jsonResponse) {
        if(err) {
            console.log("error occured on receiving data on server. ", err );
        } else {
            console.log("JSON Response: ", jsonResponse);
            Session.set("students", jsonResponse.students);
            Session.set("module_name", jsonResponse.name);
            Session.set("module_code", jsonResponse.code);
        }
    });
});