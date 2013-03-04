set :user, "ubuntu"
set :domain, "54.251.37.22"
set :application, "splinkit"

set :repository, "#{user}@#{domain}:git/#{application}.git"
set :deploy_to, "/home/#{user}/#{application}"

role :app, domain
role :web, domain
role :db, domain, :primary => true
# role :db,  "your slave db-server here"

# you might need to set this if you aren't seeing password prompts
# default_run_options[:pty] = true
# As Capistrano executes in a non-interactive mode and therefore doesn't cause
# any of your shell profile scripts to be run, the following might be needed
# if (for example) you have locally installed gems or applications.  Note:
# this needs to contain the full values for the variables set, not simply
# the deltas.
# default_environment['PATH']='<your paths>:/usr/local/bin:/usr/bin:/bin'
# default_environment['GEM_PATH']='<your paths>:/usr/lib/ruby/gems/1.8'

# miscellaneous options
set :deploy_via, :remote_cache
set :scm, 'git'
set :branch, 'master'
set :scm_verbose, true
set :use_sudo, false

# task which causes Passenger to initiate a restart
namespace :deploy do

  task :restart do
    run <<-CMD
cd #{current_path}/src; test -d tmp || mkdir tmp; touch tmp/restart.txt
    CMD
  end
  task :seed do
    run "cd #{release_path}/src; rake db:seed RAILS_ENV=production"
  end
  task :compile do
    run "cd #{release_path}/src; bundle exec rake assets:precompile"
  end
  task :migrate do
    run "cd #{release_path}/src; rake db:migrate RAILS_ENV=production"
  end
  task :setup_db do
    run "cd #{release_path}/src; rake db:setup RAILS_ENV=production"
  end
  task :config_db do
    run "cp -f #{shared_path}/database.yml #{release_path}/src/config/"
  end

  namespace :pictures do
    desc "Link system from shared to common."
    task :symlink do
      run "ln -s #{shared_path}/files/system #{release_path}/src/public"
    end
  end
end

# optional task to install bunldes
# after "deploy:update_code", :bundle_install
# desc "install the necessary prerequisites"
task :bundle_install, :roles => :app do
  run "cd #{release_path}/src && bundle install"
end

before "deploy:create_symlink", "deploy:pictures:symlink"
before "deploy:create_symlink", "deploy:config_db"
before "deploy:create_symlink", "deploy:migrate"
before "deploy:create_symlink", "deploy:compile"
# after "deploy:restart", "deploy:setup_db"

# if you want to clean up old releases on each deploy uncomment this:
after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

