require 'open-uri'

csv = File.open('data/lat_lon.csv').read
i = 0
File.open("data/lat_lon_colorific.csv", "wb") do |saved_file|
  csv.each_line do |line|
    url = line.split(',')[2]
    name = url.split('/')[-1]
    command = "/bin/bash -c 'source venv/bin/activate && colorific images/#{name}'"
    colorific_output =`#{command}`
    colors = colorific_output.split(' ')[1].split(',')
    l = line.chomp + ',' + colors[0].to_s+','+colors[1].to_s+','+colors[2].to_s+','+colors[2].to_s+','+colors[3].to_s+','+colors[4].to_s
    saved_file.puts l
    i = i+1
    print i.to_s+"\r"
    $stdout.flush
  end
end
