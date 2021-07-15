var defaultRefCode = 'H8052232981273201905';

function setRefCode(code)
{
	chrome.storage.sync.set({
		refcode_banggood: code
	  }, function() {
		//do nothing - for now
	  });
	
	if (!code.startsWith('p='))
	{
		code = 'p=' + code;
	}

	var url = window.location.toString();

	var codeExtended = code + '&';

	if (!url.includes(codeExtended))
	{
		var prefixIndex = url.lastIndexOf('/') + 1;
		var prefixUrl = url.substr(0, prefixIndex);
		var postUrl = url.substr(prefixIndex);
		
		if (postUrl.includes("?")) {
			if (postUrl.includes("?p=") || postUrl.includes("&p=")) {
				//replace existing ref code
				var regex = new RegExp("(?<=([?|&]))p=\\w+&");
				postUrl = postUrl.replace(regex, code + "&");
			} else {
				//add our very own ref code to the front
				postUrl = postUrl.replace("?", "?" + code + "&");
			}
		} else {
			postUrl = postUrl.concat("?" + code);
		}
		
		if (postUrl != null)
		{
			history.replaceState(null, null, postUrl);
			//window.location = prefixUrl + postUrl;
		}
	}	
}

chrome.storage.sync.get({
		refcode_banggood: defaultRefCode
	}, function(items) {
		if (items.refcode_banggood) 
		{
			setRefCode(items.refcode_banggood);
		}
		else
		{
			setRefCode(defaultRefCode);
		}
	}
);
