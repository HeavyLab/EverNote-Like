import '../imports/startup/accounts-config.js';
import '../imports/ui/body.js';

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {

  this.layout('ApplicationLayout');

  this.render('Sidebar', {to: 'sidebar'});

  this.render('Body', {to: 'body'});
});

Router.route('/add', function () {

  this.layout('ApplicationLayout');

  this.render('Sidebar', {to: 'sidebar'});

  this.render('Add', {to: 'body'});
});

Router.route('/search', function () {

  this.layout('ApplicationLayout');

  this.render('Sidebar', {to: 'sidebar'});

  this.render('Search', {to: 'body'});
});
