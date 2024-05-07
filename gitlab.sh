# sudo docker run --detach \
#   --hostname gitlab.example.com \
#   --publish 443:443 --publish 80:80 --publish 22:22 \
#   --name gitlab \
#   -- restart always \
#   --volume /srv/gitlab/config:/etc/gitlab \
#   --volume /srv/gitlab/logs:/var/log/gitlab \
#   --volume /srv/gitlab/data:/var/opt/gitlab \
#   gitlab/gitlab-ce:latest
  
sudo docker run --detach \
  --hostname 47.107.121.147 \
  --publish 13800:80 --publish 13822:22 \
  --name gitlab_test_winsonye \
  --restart always \
  gitlab/gitlab-ce:latest