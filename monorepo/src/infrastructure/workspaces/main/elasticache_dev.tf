resource "aws_elasticache_cluster" "dev" {
  cluster_id           = "redis-cache-dev"
  engine               = "redis"
  node_type            = "cache.t3.micro"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  engine_version       = "6.x"
  port                 = 6379
  subnet_group_name    = aws_elasticache_subnet_group.dev.name

  tags = {
    Environment = "development"
  }
}



resource "aws_elasticache_subnet_group" "dev" {
  name       = "redis-cache-subnet-dev"
  subnet_ids = ["subnet-08013876e925062b4", "subnet-08abf43211c2414c7"]

  tags = {
    Environment = "development"
  }
}


resource "aws_elasticache_user" "dev" {
  user_id       = var.redis_cache_dev_username
  user_name     = var.redis_cache_dev_username
  access_string = "on ~app::* -@all +@read +@hash +@bitmap +@geo -setbit -bitfield -hset -hsetnx -hmset -hincrby -hincrbyfloat -hdel -bitop -geoadd -georadius -georadiusbymember"
  engine        = "REDIS"
  passwords     = [var.redis_cache_dev_password]
}




resource "aws_elasticache_user_group" "dev" {
  engine        = "REDIS"
  user_group_id = "redis-users-dev"
  user_ids      = [aws_elasticache_user.dev.user_id, "default"]
}
