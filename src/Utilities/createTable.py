from __future__ import print_function # Python 2/3 compatibility
import boto3

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')


table = dynamodb.create_table(
	TableName='QuoteTableTest',
	KeySchema=[
		{
			'AttributeName': 'id',
			'KeyType': 'HASH'  #Partition key
		},
		{
			'AttributeName': 'likes',
			'KeyType': 'RANGE'  #Sort key
		}
	],
	AttributeDefinitions=[
		{
			'AttributeName': 'id',
			'AttributeType': 'S'
		},
		{
			'AttributeName': 'likes',
			'AttributeType': 'N'
		},

	],
	LocalSecondaryIndexes=[
		{
			'IndexName': 'LSI-QuoteTable-by-authorId',
			'KeySchema': [
				{
					'KeyType': 'HASH',
					'AttributeName': 'authorId'
				},
				{
					'KeyType': 'RANGE',
					'AttributeName': 'last_like_time'
				}
			],
			# Note: since we are projecting all the attributes of the table
			# into the LSI, we could have set ProjectionType=ALL and
			# skipped specifying the NonKeyAttributes
			'Projection': {
				'ProjectionType': 'INCLUDE',
			}
		}
	],
	ProvisionedThroughput={
		'ReadCapacityUnits': 1,
		'WriteCapacityUnits': 1
	}
)

print("Table status:", table.table_status)