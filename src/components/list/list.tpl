<% for (var i = 0;i < data.length;i++){ %>
<div class="list">
	<h1><%= data[i].name %></h1>
	<img src="${require('../../img/avatar.jpg')}" alt="">
	<p><%= data[i].con %></p>
</div>
<% } %>