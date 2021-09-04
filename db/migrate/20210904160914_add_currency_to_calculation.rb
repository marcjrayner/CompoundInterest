class AddCurrencyToCalculation < ActiveRecord::Migration[6.1]
  def change
    add_column :calculations, :currency, :string
  end
end
