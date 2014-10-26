csv = File.open('data/lat_lon.csv').read
newcsv = File.open('data/urls', 'w')
csv.each_line do |line|
  url = line.split(',')[2]
  name = url.split('/')[-1]
  newcsv.puts url
end
