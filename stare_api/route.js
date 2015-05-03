// This file provides the logic for getting related rules
// Author: Ricky
// Date: 4/19/15


var connectToMongo = require('../utils/mongo_connection.js');

var url = 'mongodb://104.197.63.232:27017/jurispect';
 _ = require('lodash-node/underscore');


exports.getRelatedDocumentsById = function (req, res) {
	var document_id = req.params.document_id;
	var fields_json = {id:1,document_number:1,type:1,title:1,demo_topics:1,agencies:1,publication_date:1}

		connectToMongo(url, function(err, db) {
			if(err){
				throw err;
			}
			else{
				
				// first get the ids of all related documents from related_documents table	
				db.collection('related_documents').find({'id': document_id}, function(err,cursor){
			
					if(err){
						throw err;
					}
					else{
						cursor.toArray(function(err, docs){
							
							var related_ids = _.without(docs[0]['related_ids'], document_id)

							console.log(related_ids)
							db.collection('documents').find({'id': {$in: related_ids} }, fields_json, function(err,cursor){
									if(err){
										throw err;
									}
									else{
										cursor.toArray(function(err, final_docs){
											console.log(final_docs)
											res.status(200).send({'results' :final_docs});
										});
									}
							});

						});
					}
		
				});
			}

	});	

};