output "rds_hostname" {
  description = ""
  value       = aws_db_instance.salve_dpp_db.address
  sensitive   = true
}

output "rds_port" {
  description = ""
  value       = aws_db_instance.salve_dpp_db.port
  sensitive   = true
}

output "rds_username" {
  description = ""
  value       = aws_db_instance.salve_dpp_db.username
  sensitive   = true
}