module CalculationsHelper

  def self.calculate_result(principal, interest_rate, years, compounds_per_year)
    result = principal * ((1 + interest_rate) ** (compounds_per_year * years))
    
    return result 
  end

end
