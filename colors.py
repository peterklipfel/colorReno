import datetime
from pyspark import SparkContext, SparkConf
conf = SparkConf().setAppName('lat_lon').setMaster('local')
sc = SparkContext(conf=conf)

inputRDD = sc.textFile("data/lat_lon_cartoColors.csv")
color  = inputRDD.map(lambda x: x.split(',')).map(lambda x: (x[4], x[5], x[6], x[7], x[8])).flatMap(lambda t: list(t))


# for x in lat_lon.take(100):
#   print str(x)

print color.collect()

# collection = lat_lon.collect()



