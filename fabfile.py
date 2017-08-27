from fabric.api import *
from fabric.contrib.files import exists

env.hosts=['razr@93.158.193.237', 'razr@93.158.193.238']
env.key_filename = "~/.ssh/id_rsa"
env.use_ssh_config = True


def deploy():
    
    local('zip -r site.zip ./public/*')

    if exists('~/site.zip'):
        run('rm ~/site.zip')

    if exists('~/deploy'):
        run('rm -rf ~/deploy')

    put('site.zip', '~', use_sudo=True)

    run('unzip site.zip -d deploy')
    run('sudo rm -rf /var/apps/front/*', shell=False)
    run('sudo cp -r ~/deploy/public/* /var/apps/front/', shell=False)
    run('sudo chown -R www-data:www-data /var/apps/front/', shell=False)

    local('rm site.zip')
