variable "region" {
  description = ""
  type        = string
  default     = "eu-west-2"
}

variable "name" {
  description = ""
  type        = string
  default     = "salve-dpp"
}

variable "db_name" {
  description = ""
  type        = string
  default     = "salveDpp"
}

variable "db_username" {
  description = ""
  type        = string
  default     = "main"
}

variable "db_password" {
  description = ""
  type        = string
  sensitive   = true
}