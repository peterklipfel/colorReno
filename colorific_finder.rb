require 'open-uri'

csv = File.open('data/lat_lon.csv').read
csv.each_line do |line|
  url = line.split(',')[2]
  name = url.split('/')[-1]
  File.open("data/lat_lon_colorific.csv", "wb") do |saved_file|
    l = line
    saved_file.puts line
  end
end
