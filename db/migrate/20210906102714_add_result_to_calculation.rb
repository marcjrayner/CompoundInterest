class AddResultToCalculation < ActiveRecord::Migration[6.1]
  def change
    add_column :calculations, :result, :decimal
  end
end
