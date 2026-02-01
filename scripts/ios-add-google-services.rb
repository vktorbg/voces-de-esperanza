#!/usr/bin/env ruby
require 'xcodeproj'

# Define paths
project_path = 'ios/App/App.xcodeproj'
plist_name = 'GoogleService-Info.plist'
plist_path = "ios/App/App/#{plist_name}" # Relative to repo root

puts "Checking for #{plist_name}..."

# Check if plist exists on disk
unless File.exist?(plist_path)
  puts "Error: #{plist_path} not found on disk. Ensure it is decoded/created before running this script."
  exit 1
end

# Open project
puts "Opening project at #{project_path}"
project = Xcodeproj::Project.open(project_path)
target = project.targets.first # 'App' target

# Verify target name just in case
if target.name != 'App'
  puts "Warning: First target is '#{target.name}', expected 'App'. Searching for 'App'..."
  target = project.targets.find { |t| t.name == 'App' }
  if target.nil?
    puts "Error: Could not find 'App' target locally."
    exit 1
  end
end
puts "Target found: #{target.name}"

# Find the group 'App' (where AppDelegate.swift is usually located)
# In Capacitor projects, usually main group -> App
# 'find_sub_group' does not exist in some versions, using [] operator or iteration
group = project.main_group['App']

if group.nil?
    puts "Warning: 'App' group not found via []. Searching via iteration..."
    project.main_group.children.each { |c| puts " - #{c.name} (#{c.isa})" }
    
    # Fallback search
    group = project.main_group.children.find { |c| c.isa == 'PBXGroup' && c.name == 'App' }
    
    if group.nil?
       puts "Adding directly to main group as fallback."
       group = project.main_group
    else
       puts "Found 'App' group via iteration."
    end
end

puts "Using group: #{group.name}"

# Check if file is already in the group
# We use simple iteration to be safe against API versions
file_ref = group.files.find { |f| f.path == plist_name || f.name == plist_name }

if file_ref
  puts "#{plist_name} reference already exists in project structure."
else
  puts "Adding #{plist_name} reference to project..."
  # new_file adds the file to the group and sets up the reference
  file_ref = group.new_file(plist_name)
end

# Add to Resources build phase
resources_phase = target.resources_build_phase
build_file = resources_phase.files.find { |file| file.file_ref == file_ref }

if build_file
  puts "#{plist_name} is already in Resources build phase."
else
  puts "Adding #{plist_name} to Resources build phase..."
  resources_phase.add_file_reference(file_ref)
  project.save
  puts "Project saved successfully!"
end
