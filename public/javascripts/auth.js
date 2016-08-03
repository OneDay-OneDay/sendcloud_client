module.exports = {
	already_login(nextState, replace){
		if(localStorage.sc_client_login_state){
			replace("/send_email/sending");
		}else{
			return;
		};
	},
	replace_away(nextState, replace){
		if(localStorage.sc_client_login_state){
			return;
		}else{
			replace("/send_email/notlogin");
		};
	}
}