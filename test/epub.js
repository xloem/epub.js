var assert = require('assert');
// var sinon = require('sinon');


describe('ePub', function() {
	var ePub = require('../src/epub');
	var server;
	before(function(){
		/*
		// var packageContents = fs.readFileSync(__dirname + '/../books/moby-dick/OPS/package.opf', 'utf8');
		// var tocContents = fs.readFileSync(__dirname + '/../books/moby-dick/OPS/toc.xhtml', 'utf8');
		var packageContents = require('raw-loader!./fixtures/moby-dick/OPS/package.opf');
		var tocContents = require('raw-loader!./fixtures/moby-dick/OPS/toc.xhtml');

		server = sinon.fakeServer.create();
		server.autoRespond = true;

		server.respondWith("moby-dick/OPS/package.opf", [200, {
			"Content-Type": "text/xml"
		}, packageContents]);

		server.respondWith("moby-dick/OPS/toc.xhtml", [200, {
			"Content-Type": "application/xhtml+xml"
		}, tocContents]);
		*/

	});
	after(function(){
		// server.restore();
	});

	it('should open a epub', function() {
		var epub = ePub("/fixtures/alice/OPS/package.opf");

		return epub.opened.then(function(book){

			assert.equal( book.isOpen, true, "book is opened" );

			assert.equal( book.url.toString(), "http://localhost:9876/fixtures/alice/OPS/package.opf", "book url is passed to new Book" );
		});
	});

	it('should open a archived epub', function() {
		var book = ePub("/fixtures/alice.epub");

		assert(typeof (JSZip) !== "undefined", "JSZip is present" );

		return book.opened.then(function(){
			assert.equal( book.isOpen, true, "book is opened" );
			assert( book.archive, "book is unarchived" );
		});
	});

	it('should open report the manifest on ready', function() {
		var book = ePub("/fixtures/alice/OPS/package.opf");

		return book.ready.then(function(manifest){
			assert.equal( manifest.metadata.title, "Alice's Adventures in Wonderland" );
			assert.equal( manifest.toc.length, 11);
			assert.equal( manifest.resources.length, 42 );
			assert.equal( manifest.spine.length, 13 );
			assert.equal( manifest.landmarks.length, 0 );
		});
	});

});
