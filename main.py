import webapp2
import SimpleHTTPServer
import SecondFile

import os #added
from google.appengine.ext.webapp import template

import json

from requests_toolbelt.adapters import appengine
appengine.monkeypatch()
import requests

from bs4 import BeautifulSoup as bs

class Receiver(webapp2.RequestHandler):
	def post(self):

		token = self.request.get('event')
		print "got here"

class Messenger(webapp2.RequestHandler):
    def get(self):

    	path = os.path.join(os.path.dirname(__file__), 'templates/html/messenger.html') 
        self.response.out.write(template.render(path, {}))



class MainPage(webapp2.RequestHandler):
    def get(self):
        
        guestbook_name = SecondFile.test()

        
        path = os.path.join(os.path.dirname(__file__), 'templates/html/home.html') 
        self.response.out.write(template.render(path, {}) % guestbook_name) #passes in this value
        #test = requests.get('http://www.xe.com/currencyconverter/convert/?Amount=1.5&From=XBT&To=GBP')


       
       #for picking data out of html
   #     # r = requests.get(
   #  		'http://www.xe.com/currencyconverter/convert/?Amount=1.5&From=XBT&To=GBP',
   #  		timeout=5
			# )
   #      html = r.content
   #      soup = bs(html, "html.parser")
   #      #elem = soup.findAll('span class', {'title': 'uccResultAmount'})
   #      elem = soup.findAll('span class')
        
       


        #elem.attrs['uccResultAmount']
      


app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/messenger', Messenger),
    ('/receiver', Receiver),
], debug=True)