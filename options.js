function saveOptions() {
  chrome.storage.sync.set({
    refcode_banggood: document.querySelector('#refcode_banggood').value
  }, function() {
    //do nothing - for now
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    refcode_banggood: 'H8052232981273201905'
  }, function(items) {
    document.querySelector('#refcode_banggood').value = items.refcode_banggood;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);